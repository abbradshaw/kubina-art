import React, {useEffect} from 'react'

export function StudioAccessibility(props: {children: React.ReactNode}) {
  useEffect(() => {
    const css = `
      [data-ui="StudioLayout"] { font-size: 16px !important; }
      [data-ui="Text"] { font-size: 16px !important; }
      [data-ui="Heading"] { font-size: 20px !important; }
      [data-testid="field-label"] {
        font-size: 17px !important;
        font-weight: 600 !important;
        color: #1a1a2e !important;
        margin-bottom: 8px !important;
      }
      [data-testid="input"] {
        font-size: 16px !important;
        padding: 12px 14px !important;
        min-height: 44px !important;
      }
      [data-testid="action-publish"] {
        font-size: 17px !important;
        font-weight: 700 !important;
        padding: 14px 28px !important;
        border-radius: 8px !important;
      }
      [data-testid="action-publish"] span { font-size: 17px !important; }
      [data-testid="action-save"] {
        font-size: 16px !important;
        padding: 12px 20px !important;
      }
      [data-ui="Badge"] {
        font-size: 14px !important;
        font-weight: 700 !important;
        padding: 4px 10px !important;
        text-transform: uppercase !important;
      }
      [data-ui="ListItem"] {
        padding: 14px 16px !important;
        font-size: 16px !important;
      }
      [data-ui="PaneHeader"] {
        font-size: 18px !important;
        font-weight: 700 !important;
        padding: 18px 20px !important;
      }
      [data-ui="PaneItem"] {
        font-size: 16px !important;
        padding: 12px 16px !important;
      }
      [data-testid="field-description"] {
        font-size: 14px !important;
        color: #555 !important;
        line-height: 1.5 !important;
        margin-top: 6px !important;
      }
      [data-ui="Dialog"] { font-size: 16px !important; }
      [data-ui="Dialog"] button {
        font-size: 16px !important;
        padding: 12px 20px !important;
      }
      button[aria-label*="AI"], button[title*="AI"] {
        background-color: #7c3aed !important;
        color: white !important;
        font-size: 16px !important;
        font-weight: 700 !important;
        padding: 10px 18px !important;
        border-radius: 8px !important;
      }
      ::-webkit-scrollbar { width: 14px !important; height: 14px !important; }
      ::-webkit-scrollbar-thumb { background: #94a3b8 !important; border-radius: 7px !important; }
      *:focus-visible {
        outline: 3px solid #3b82f6 !important;
        outline-offset: 2px !important;
      }
      [data-ui="PaneContent"] { min-width: 320px !important; }
    `
    const style = document.createElement('style')
    style.textContent = css
    style.id = 'senior-accessibility-styles'
    document.head.appendChild(style)
    return () => {
      const existing = document.getElementById('senior-accessibility-styles')
      if (existing) existing.remove()
    }
  }, [])

  return <>{props.children}</>
}
