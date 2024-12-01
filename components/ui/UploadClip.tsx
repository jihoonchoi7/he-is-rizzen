"use client"

import * as React from "react"
import { Paperclip } from "lucide-react"
import { Button } from "./generatebutton"

interface UploadClipProps {
  onUpload: (files: FileList) => void
}

const UploadClip = ({ onUpload }: UploadClipProps) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleClick = (e: React.MouseEvent) => {
    console.log('📎 Upload button clicked')
    e.preventDefault()
    e.stopPropagation()
    try {
      console.log('🔍 Checking fileInputRef:', fileInputRef.current)
      fileInputRef.current?.click()
      console.log('✅ Click triggered on file input')
    } catch (error) {
      console.error('❌ Error triggering file input:', error)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      console.log('📄 File input changed')
      const files = event.target.files
      console.log('📁 Files selected:', files)
      
      if (files && files.length > 0) {
        console.log(`✅ Uploading ${files.length} file(s):`, Array.from(files).map(f => f.name))
        onUpload(files)
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
          console.log('🧹 Input cleared')
        }
      }
    } catch (error) {
      console.error('❌ Error handling file change:', error)
    }
  }

  return (
    <div className="relative inline-block">
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={handleClick}
        className="relative z-10"
      >
        <Paperclip className="h-5 w-5" />
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
        onChange={handleChange}
        multiple
        accept="image/*,.pdf,.doc,.docx,.txt"
      />
    </div>
  )
}

export { UploadClip }
