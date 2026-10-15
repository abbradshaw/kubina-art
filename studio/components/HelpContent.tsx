import React from "react"
import {Box, Card, Heading, Text, Stack, Flex, Container} from "@sanity/ui"

export default function HelpContent() {
  return (
    <Container width={3}>
      <Box padding={5}>
        <Stack space={5}>

          <Card padding={5} radius={3} shadow={1} tone="primary">
            <Heading size={3}>Welcome to the Editor</Heading>
            <Text size={2} muted style={{marginTop: 12, lineHeight: 1.6}}>
              This guide shows you how to update Peter's art website.
              You can come back here anytime by clicking "How to Use This Editor" in the left menu.
            </Text>
          </Card>

          <Card padding={5} radius={3} shadow={1}>
            <Heading size={3}>Editing an Existing Artwork</Heading>
            <Box style={{marginTop: 16}}>
              <Step n={1} text="Click All Artworks in the left menu" />
              <Step n={2} text="Scroll or search to find the piece you want to edit" />
              <Step n={3} text="Click the artwork title to open it" />
              <Step n={4} text="Make your changes in the form fields" />
              <Step n={5} text="Click the BLUE Publish button (top-right) to save to the website" />
            </Box>
            <Card padding={3} radius={2} tone="caution" style={{marginTop: 16}}>
              <Text size={2}>
                <strong>Remember:</strong> Gray Save = only you see it.
                Blue Publish = the website updates in 1-2 minutes.
              </Text>
            </Card>
            <Text size={2} style={{color: "#e2e8f0", marginTop: 16}}><strong>Fields you can edit:</strong></Text>
            <Box style={{paddingLeft: 40, marginTop: 8}}>
              <FieldItem text="Title — Name of the artwork (appears as headline)" />
              <FieldItem text="Slug — Web address (auto-generated from title)" />
              <FieldItem text="Photo — Upload image (watermark added automatically)" />
              <FieldItem text="Category — Painting, Drawing, Sculpture, or Digital" />
              <FieldItem text="Status — Available, On Hold, Sold, or Private" />
              <FieldItem text="Year — When it was made (sorts the gallery)" />
              <FieldItem text="Medium — Materials used (e.g. Oil on canvas)" />
              <FieldItem text="Dimensions — Size (e.g. 24 x 36 inches)" />
              <FieldItem text="Description — Story or curator notes" />
            </Box>
          </Card>

          <Card padding={5} radius={3} shadow={1} tone="primary">
            <Heading size={3}>Reordering Categories on the Homepage</Heading>
            <Box style={{marginTop: 16}}>
              <Step n={1} text="Click Site Settings in the left menu" />
              <Step n={2} text="Look for the Homepage Category Order field" />
              <Step n={3} text="Drag categories up or down to change their order" />
              <Step n={4} text="Click the BLUE Publish button to save changes" />
            </Box>
            <Card padding={3} radius={2} tone="primary" style={{marginTop: 16}}>
              <Text size={2}>
                Tip: The first category in the list appears first on the homepage.
                All artwork within each category is sorted by year (newest first).
              </Text>
            </Card>
          </Card>

          <Card padding={5} radius={3} shadow={1} tone="positive">
            <Heading size={3}>Adding a Brand New Artwork</Heading>
            <Box style={{marginTop: 16}}>
              <Step n={1} text="Click All Artworks in the left menu" />
              <Step n={2} text="Click the + (Create new) button in the top-right of the list" />
              <Step n={3} text="Fill in the form: Title, Photo, Category, Status, Year, etc." />
              <Step n={4} text="For the Web Address (Slug), click Generate to auto-create it from the title" />
              <Step n={5} text="Upload the artwork photo. A copyright watermark is added automatically" />
              <Step n={6} text="Click the BLUE Publish button to make it live on the website" />
            </Box>
            <Card padding={3} radius={2} tone="primary" style={{marginTop: 16}}>
              <Text size={2}>
                Tip: The artwork appears on the website sorted by year (newest first).
                Make sure the Year field is correct.
              </Text>
            </Card>
          </Card>

          <Card padding={5} radius={3} shadow={1}>
            <Heading size={3}>Editing the About Page</Heading>
            <Box style={{marginTop: 16}}>
              <Step n={1} text="Click About the Artist in the left menu" />
              <Step n={2} text="Edit the Page Title, Portrait Photo, or Pull Quote" />
              <Step n={3} text="To add story chapters, click + Add item under Chapters" />
              <Step n={4} text="Each chapter has: a label, title, text, and optionally an image with caption" />
              <Step n={5} text="Click the BLUE Publish button to save changes to the website" />
            </Box>
            <Card padding={3} radius={2} tone="primary" style={{marginTop: 16}}>
              <Text size={2}>
                Tip: Chapters appear on the About page in the order you see them here.
                Drag chapters up or down to reorder.
              </Text>
            </Card>
          </Card>

          <Card padding={5} radius={3} shadow={1}>
            <Heading size={3}>What the Colors Mean</Heading>
            <Box style={{marginTop: 16}}>
              <StatusRow bg="#dcfce7" fg="#166534" label="LIVE" desc="This page is on the website" />
              <StatusRow bg="#dbeafe" fg="#1e40af" label="DRAFT" desc="Saved but not on the website yet" />
              <StatusRow bg="#fef3c7" fg="#92400e" label="CHANGED" desc="Has new edits that have not been published" />
            </Box>
          </Card>

          <Card padding={5} radius={3} shadow={1}>
            <Heading size={3}>Artwork Status Labels</Heading>
            <Box style={{marginTop: 16}}>
              <LabelRow dot="Green dot" label="Available" desc="For sale" />
              <LabelRow dot="Yellow dot" label="On Hold" desc="Someone is interested" />
              <LabelRow dot="Red dot" label="Sold" desc="No longer available" />
              <LabelRow dot="Black dot" label="Private Collection" desc="Not for sale" />
            </Box>
          </Card>

          <Card padding={5} radius={3} shadow={1} tone="primary">
            <Heading size={3}>AI Writing Helper</Heading>
            <Text size={2} style={{marginTop: 12, lineHeight: 1.6}}>
              Look for the sparkle icon on text fields. Click it to get AI help
              writing descriptions, titles, or curator notes. It will not replace your text
              automatically — it just gives you suggestions you can use or ignore.
            </Text>
          </Card>

          <Card padding={5} radius={3} shadow={1} tone="transparent">
            <Heading size={3}>Quick Reference</Heading>
            <Box style={{marginTop: 12}}>
              <RefItem text="Website: https://peterkubinaart.com" />
n              <RefItem text="Editor: https://kubina-art-studio.sanity.studio" />
              <RefItem text="Can not break anything: If unsure, just Save (do not Publish). Nothing changes on the live site until you Publish." />
              <RefItem text="Questions? Ask for help." />
            </Box>
          </Card>

        </Stack>
      </Box>
    </Container>
  )
}

function Step({n, text}: {n: number; text: string}) {
  return (
    <Flex gap={3} align="flex-start" style={{marginBottom: 12}}>
      <Box style={{
        minWidth: 28, height: 28, borderRadius: "50%", background: "#2563eb",
        color: "white", display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: 700, fontSize: 14, marginTop: 2,
      }}>{n}</Box>
      <Text size={2} style={{lineHeight: 1.5}}>{text}</Text>
    </Flex>
  )
}

function FieldItem({text}: {text: string}) {
  return (
    <Text size={1} style={{color: "#94a3b8", marginBottom: 10, lineHeight: 1.6}}>
      {text}
    </Text>
  )
}

function StatusRow({bg, fg, label, desc}: {bg: string; fg: string; label: string; desc: string}) {
  return (
    <Flex gap={3} align="center" style={{marginBottom: 12}}>
      <Box padding={2} style={{
        borderRadius: 4, background: bg, color: fg, fontWeight: 700,
        fontSize: 12, minWidth: 110, textAlign: "center",
      }}>{label}</Box>
      <Text size={2}>{desc}</Text>
    </Flex>
  )
}

function LabelRow({dot, label, desc}: {dot: string; label: string; desc: string}) {
  return (
    <Flex gap={3} align="center" style={{marginBottom: 12}}>
      <Text size={2} style={{minWidth: 80}}>{dot}</Text>
      <Text size={2}><strong>{label}</strong> — {desc}</Text>
    </Flex>
  )
}

function RefItem({text}: {text: string}) {
  return (
    <Text size={2} style={{marginBottom: 10, lineHeight: 1.5}}>{text}</Text>
  )
}
