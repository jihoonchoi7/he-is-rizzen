"use client"

import * as React from "react"
import { Send, X } from "lucide-react"
import { Textarea } from "./textarea"
import { Button } from "./generatebutton"
import { UploadClip } from "./UploadClip"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"

const categories = [
  "reconciliation",
  "wife",
  "husband",
  "making new friends",
  "apologizing",
  "grief",
  "dating",
  "co-workers",
]

interface UploadedFile {
  id: string
  name: string
  url: string
  type: string
}

export function RelationshipChat() {
  const [uploadedFiles, setUploadedFiles] = React.useState<UploadedFile[]>([])
  const [message, setMessage] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('📨 Submitting form:', { 
      message, 
      files: uploadedFiles.map(f => ({
        name: f.name,
        type: f.type,
        url: f.url
      }))
    })
    setMessage("")
    setUploadedFiles([])
    console.log('🧹 Form cleared')
  }

  const handleUpload = (files: FileList) => {
    console.log('📥 Processing files:', Array.from(files).map(f => f.name))
    const newFiles = Array.from(files).map(file => {
      const fileObj = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type
      }
      console.log('🎯 Created file object:', fileObj)
      return fileObj
    })
    setUploadedFiles(prev => {
      console.log('📚 Updated files state:', [...prev, ...newFiles])
      return [...prev, ...newFiles]
    })
  }

  const removeFile = (id: string) => {
    console.log('🗑️ Removing file:', id)
    setUploadedFiles(prev => {
      const fileToRemove = prev.find(file => file.id === id)
      if (fileToRemove) {
        console.log('🔥 Revoking URL:', fileToRemove.url)
        URL.revokeObjectURL(fileToRemove.url)
      }
      const newFiles = prev.filter(file => file.id !== id)
      console.log('📚 Updated files state after removal:', newFiles)
      return newFiles
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-3xl mx-auto p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">
            How can I help your relationship?
          </h1>
          <p className="text-gray-600 mb-6">
            Helping to create new relationships and manage relationship with biblical
            context and teachings.
          </p>
        </div>

        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="relative">
            <div className="rounded-md border border-input bg-transparent relative">
              {uploadedFiles.length > 0 && (
                <div className="p-2 border-b bg-muted/20">
                  <div className="flex flex-wrap gap-2">
                    {uploadedFiles.map(file => (
                      <div
                        key={file.id}
                        className="relative group rounded-md border border-input bg-background p-2 flex items-center gap-2"
                      >
                        {file.type.startsWith('image/') ? (
                          <img
                            src={file.url}
                            alt={file.name}
                            className="h-8 w-8 object-cover rounded"
                          />
                        ) : (
                          <div className="h-8 w-8 bg-muted rounded flex items-center justify-center text-xs">
                            File
                          </div>
                        )}
                        <span className="text-sm truncate max-w-[100px]">
                          {file.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFile(file.id)}
                          className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="border-0 focus-visible:ring-0"
                rows={4}
              />
              <div className="absolute bottom-2 right-2 flex items-center gap-2">
                <UploadClip onUpload={handleUpload} />
                <Button size="icon" type="submit">
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </form>

          <div className="flex justify-start">
            <Select>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
} 