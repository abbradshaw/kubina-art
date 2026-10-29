import React from 'react'
import {useRouter} from 'sanity/router'

function ActionCard({icon, title, description, onClick}: {icon: string; title: string; description: string; onClick?: () => void}) {
  return (
    <div 
      onClick={onClick}
      style={{
        background: '#1e1e1e',
        borderRadius: '8px',
        padding: '20px',
        cursor: onClick ? 'pointer' : 'default',
        border: '1px solid #333',
        transition: 'all 0.2s',
      }}
      onMouseEnter={(e) => {e.currentTarget.style.borderColor = '#555'}}
      onMouseLeave={(e) => {e.currentTarget.style.borderColor = '#333'}}
    >
      <div style={{fontSize: '24px', marginBottom: '12px'}}>{icon}</div>
      <h3 style={{margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600, color: '#fff'}}>{title}</h3>
      <p style={{margin: 0, fontSize: '13px', color: '#999', lineHeight: 1.5}}>{description}</p>
    </div>
  )
}

export default function StartHere() {
  const router = useRouter()

  const openAbout = () => router.navigate({intent: 'edit', params: {id: 'about-page', type: 'about'}})
  const openSettings = () => router.navigate({intent: 'edit', params: {id: 'settings', type: 'settings'}})
  const openWorks = () => router.navigate({intent: 'create', params: {type: 'work'}})

  return (
    <div style={{maxWidth: '800px', margin: '0 auto', padding: '40px 20px'}}>
      <h1 style={{fontSize: '32px', fontWeight: 700, marginBottom: '8px', color: '#fff'}}>
        What do you want to do?
      </h1>
      
      <div style={{
        background: '#1a1a3e',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '40px',
        border: '1px solid #333',
      }}>
        <p style={{margin: 0, fontSize: '15px', color: '#ccc', lineHeight: 1.6}}>
          <strong>Click a task below</strong> — it takes you straight to the right place. When you're finished making changes, always press the <strong style={{color: '#3b82f6'}}>BLUE Publish button</strong> at the bottom, then wait about 3 minutes for the website to update.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px',
        marginBottom: '40px',
      }}>
        <ActionCard 
          onClick={openWorks}
          icon="🖼️" 
          title="Add new artwork" 
          description="Upload a photo, add title, year, medium, dimensions, and mark it as Available, Sold, etc."
        />
        <ActionCard 
          onClick={openAbout}
          icon="👤" 
          title="Edit the About page" 
          description="Change Peter's bio, photo, and story chapters. Click the About the Artist menu item."
        />
        <ActionCard 
          onClick={openSettings}
          icon="⚙️" 
          title="Change site settings" 
          description="Update contact email, toggle purchase inquiries, hide/show artwork status, or reorder homepage categories."
        />
        <ActionCard 
          icon="🏷️" 
          title="Browse by status" 
          description="See all Available, Sold, or On Hold pieces at a glance. Use the Browse by Status menu."
        />
      </div>

      <h2 style={{fontSize: '20px', fontWeight: 600, marginBottom: '16px', color: '#fff'}}>
        Reference — how editing works
      </h2>
      <div style={{
        background: '#1e1e1e',
        borderRadius: '8px',
        padding: '20px',
        border: '1px solid #333',
      }}>
        <ul style={{margin: 0, paddingLeft: '20px', color: '#aaa', fontSize: '14px', lineHeight: 1.8}}>
          <li><strong>Draft vs Published:</strong> Changes are saved as Draft. Click <strong style={{color: '#3b82f6'}}>Publish</strong> to make them live.</li>
          <li><strong>Adding artwork:</strong> Click <strong>All Artworks</strong> → <strong>+</strong> button. Fill in details, upload image, then Publish.</li>
          <li><strong>Status colors:</strong> 🟢 Available  🟡 On Hold  🔴 Sold  ⚫ Private Collection</li>
          <li><strong>Images:</strong> The site automatically watermarks artwork photos. No extra steps needed.</li>
          <li><strong>Purchase inquiries:</strong> Toggle in <strong>Site Settings</strong>. OFF = gallery only. ON = shows email box on Available pieces.</li>
          <li><strong>Artwork status:</strong> Toggle in <strong>Site Settings</strong>. OFF = hides "Available/Sold" labels from public view. ON = shows them.</li>
          <li><strong>Contact email:</strong> Change the reply-to address for purchase inquiries in <strong>Site Settings</strong>.</li>
        </ul>
      </div>
    </div>
  )
}
