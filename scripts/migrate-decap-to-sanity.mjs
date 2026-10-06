#!/usr/bin/env node
import {createClient} from '@sanity/client'
import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'

const CONFIG = {
  workDir: 'src/content/work',
  aboutFile: 'src/content/pages/about.md',
  mediaFolder: 'src/assets/uploads',
}

if (!process.env.SANITY_PROJECT_ID || !process.env.SANITY_WRITE_TOKEN) {
  console.error('Set SANITY_PROJECT_ID and SANITY_WRITE_TOKEN env vars.')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2026-09-30',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

function sanitizeId(s) {
  return s.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9_.-]/g, '')
}

async function resolveImagePath(value, fromDir) {
  const raw = String(value).replace(/^["']|["']$/g, '')
  const candidates = [
    path.resolve(fromDir, raw),
    path.resolve(process.cwd(), raw.replace(/^\//, '')),
  ]
  for (const c of candidates) {
    try { await fs.access(c); return c } catch {}
  }
  const target = path.basename(raw)
  const stack = [path.resolve(process.cwd(), CONFIG.mediaFolder)]
  while (stack.length) {
    const dir = stack.pop()
    let entries
    try { entries = await fs.readdir(dir, {withFileTypes: true}) } catch { continue }
    for (const e of entries) {
      const p = path.join(dir, e.name)
      if (e.isDirectory()) stack.push(p)
      else if (e.name === target) return p
    }
  }
  return null
}

const uploaded = new Map()

async function uploadImage(value, fromDir) {
  if (!value) return undefined
  const filePath = await resolveImagePath(value, fromDir)
  if (!filePath) {
    console.warn('    [warn] image not found: ' + value)
    return undefined
  }
  if (uploaded.has(filePath)) return uploaded.get(filePath)
  const buffer = await fs.readFile(filePath)
  const asset = await client.assets.upload('image', buffer, {
    filename: path.basename(filePath),
  })
  const imageField = {_type: 'image', asset: {_type: 'reference', _ref: asset._id}}
  uploaded.set(filePath, imageField)
  console.log('    image: ' + path.basename(filePath))
  return imageField
}

async function* walk(dir) {
  for (const e of await fs.readdir(dir, {withFileTypes: true})) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) yield* walk(p)
    else if (e.name.endsWith('.md')) yield p
  }
}

async function migrateWork() {
  for await (const file of walk(CONFIG.workDir)) {
    const {data, content} = matter(await fs.readFile(file, 'utf8'))
    const slug = path.basename(file, '.md')
    const doc = {
      _id: 'work-' + sanitizeId(slug),
      _type: 'work',
      title: data.title,
      slug: {_type: 'slug', current: slug},
      image: await uploadImage(data.image, path.dirname(file)),
      category: data.category || 'Painting',
      status: data.status || 'Available',
      year: String(data.year || ''),
      medium: data.medium || '',
      dimensions: data.dimensions || '',
      body: content.trim(),
    }
    await client.createOrReplace(doc)
    console.log('  work: ' + slug)
  }
}

async function migrateAbout() {
  const {data} = matter(await fs.readFile(CONFIG.aboutFile, 'utf8'))
  const fromDir = path.dirname(CONFIG.aboutFile)
  const chapters = []
  for (const ch of data.chapters || []) {
    chapters.push({
      _type: 'chapter',
      _key: Math.random().toString(36).slice(2, 10),
      label: ch.label,
      title: ch.title,
      text: ch.text,
      artwork: await uploadImage(ch.artwork, fromDir),
      caption: ch.caption,
    })
  }
  const doc = {
    _id: 'about-page',
    _type: 'about',
    title: data.title || 'About the Artist',
    image: await uploadImage(data.image, fromDir),
    pull_quote: data.pull_quote,
    chapters,
  }
  await client.createOrReplace(doc)
  console.log('  about page')
}

console.log('Migrating to Sanity...')
await migrateWork()
await migrateAbout()
console.log('Done.')
