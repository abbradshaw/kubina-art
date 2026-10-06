import {useState} from 'react'
import {useClient, set, unset} from 'sanity'
import {Button, Card, Flex, Spinner, Stack, Text} from '@sanity/ui'

const WATERMARK_TEXT = '© Peter Kubina'

async function watermarkedJpeg(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file, {imageOrientation: 'from-image'})
  const canvas = document.createElement('canvas')
  canvas.width = bitmap.width
  canvas.height = bitmap.height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas not supported')

  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(bitmap, 0, 0)

  const fontSize = Math.max(24, Math.round(canvas.width * 0.055))
  const padding = Math.max(20, Math.round(canvas.width * 0.03))
  ctx.font = `bold ${fontSize}px 'Helvetica Neue', Helvetica, Arial, sans-serif`
  ctx.textAlign = 'right'
  ctx.textBaseline = 'bottom'
  ctx.lineWidth = Math.max(2, Math.round(fontSize * 0.15))
  ctx.strokeStyle = '#000000'
  ctx.fillStyle = '#ffffff'
  const x = canvas.width - padding
  const y = canvas.height - padding
  ctx.strokeText(WATERMARK_TEXT, x, y)
  ctx.fillText(WATERMARK_TEXT, x, y)
  bitmap.close()

  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Could not encode the image'))),
      'image/jpeg',
      0.92,
    ),
  )
}

function previewUrl(assetRef: string, projectId?: string, dataset?: string) {
  const id = assetRef.replace(/^image-/, '')
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}?w=400`
}

export default function WatermarkedImageInput(props: any) {
  const client = useClient({apiVersion: '2026-09-30'})
  const {projectId, dataset} = client.config()
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const currentRef = props.value?.asset?._ref

  async function handleFile(event: any) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    setUploading(true)
    setError(null)
    try {
      const blob = await watermarkedJpeg(file)
      const asset = await client.assets.upload('image', blob, {
        filename: file.name.replace(/\.[^.]+$/, '') + '.jpg',
      })
      props.onChange(set({_type: 'image', asset: {_type: 'reference', _ref: asset._id}}))
    } catch (err: any) {
      setError('Upload failed: ' + (err?.message ?? String(err)))
    } finally {
      setUploading(false)
    }
  }

  return (
    <Stack space={3}>
      {currentRef ? (
        <Card padding={2} radius={2} shadow={1}>
          <img
            src={previewUrl(currentRef, projectId, dataset)}
            alt="Artwork preview"
            style={{maxWidth: '100%', display: 'block'}}
          />
        </Card>
      ) : (
        <Text size={1} muted>No image uploaded yet.</Text>
      )}

      <Flex gap={2} align="center">
        <Button
          text={uploading ? 'Adding watermark & uploading…' : currentRef ? 'Replace image' : 'Upload image'}
          mode="ghost"
          disabled={uploading}
          onClick={() => document.getElementById('watermarked-file-input')?.click()}
        />
        {uploading && <Spinner muted />}
        {currentRef && !uploading && (
          <Button text="Remove" mode="bleed" tone="critical" onClick={() => props.onChange(unset())} />
        )}
      </Flex>

      <input id="watermarked-file-input" type="file" accept="image/jpeg,image/png,image/webp" style={{display: 'none'}} onChange={handleFile} />

      <Text size={1} muted>
        The © Peter Kubina watermark is added automatically in the bottom-right corner before
        the image is saved. Use a JPG or PNG photo.
      </Text>

      {error && <Text size={1} style={{color: 'red'}}>{error}</Text>}
    </Stack>
  )
}
