import { useState, useRef } from 'react'
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import axiosInstance from '@/lib/axios/instance'
import { toast } from 'sonner'

interface ImageUploaderProps {
  value: string
  onChange: (url: string) => void
  label?: string
  required?: boolean
  error?: string
  className?: string
}

export function ImageUploader({
  value,
  onChange,
  label,
  required = false,
  error,
  className = '',
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast('Vui lòng chọn file ảnh')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast('Kích thước file không được vượt quá 5MB')
      return
    }

    setUploading(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const { data } = await axiosInstance.post('/file/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0
          setUploadProgress(progress)
        },
      })

      if (data.code === 200 && data.result) {
        onChange(data.result)
      } else {
        throw new Error(data.message || 'Upload thất bại')
      }
    } catch (error: any) {
      console.error('Upload error:', error)
      toast(error.message || 'Có lỗi xảy ra khi upload ảnh')
    } finally {
      setUploading(false)
      setUploadProgress(0)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemove = () => {
    onChange('')
  }

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium mb-2">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      <div className="flex gap-3">
        {/* URL Input */}
        <div className="flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Nhập URL hoặc upload ảnh"
            className={`w-full px-4 py-2 border-2 rounded-xl bg-background focus:outline-none transition-colors ${
              error ? 'border-destructive' : 'border-border focus:border-primary'
            }`}
          />
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>

        {/* Upload Button */}
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="h-[42px]"
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {uploadProgress}%
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </>
            )}
          </Button>
        </div>

        {/* Preview */}
        {value && (
          <div className="relative w-16 h-16 rounded-lg overflow-hidden border-2 border-border group">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            >
              <X className="h-4 w-4 text-white" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

interface MultiImageUploaderProps {
  values: string[]
  onChange: (urls: string[]) => void
  label?: string
  maxImages?: number
}

export function MultiImageUploader({
  values,
  onChange,
  label,
  maxImages = 10,
}: MultiImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    if (values.length + files.length > maxImages) {
      toast(`Chỉ được upload tối đa ${maxImages} ảnh`)
      return
    }

    setUploading(true)
    const uploadedUrls: string[] = []

    try {
      for (const file of files) {
        if (!file.type.startsWith('image/')) continue
        if (file.size > 5 * 1024 * 1024) continue

        const formData = new FormData()
        formData.append('file', file)

        const { data } = await axiosInstance.post('/file/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })

        if (data.code === 200 && data.result) {
          uploadedUrls.push(data.result)
        }
      }

      onChange([...values, ...uploadedUrls])
    } catch (error) {
      console.error('Upload error:', error)
      toast('Có lỗi xảy ra khi upload ảnh')
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleAddUrl = () => {
    const url = prompt('Nhập URL hình ảnh:')
    if (url) {
      onChange([...values, url])
    }
  }

  const handleRemove = (index: number) => {
    onChange(values.filter((_, i) => i !== index))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        {label && <label className="text-sm font-medium">{label}</label>}
        <div className="flex gap-2">
          {/* <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleAddUrl}
            disabled={values.length >= maxImages}
          >
            <ImageIcon className="h-4 w-4 mr-1" />
            URL
          </Button> */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading || values.length >= maxImages}
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                Đang tải...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-1" />
                Upload
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {values.map((img, idx) => (
          <div key={idx} className="relative group">
            <div className="w-full aspect-square rounded-lg overflow-hidden border-2 border-border">
              <img src={img} alt={`Image ${idx + 1}`} className="w-full h-full object-cover" />
            </div>
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              className="absolute top-1 right-1 p-1 bg-destructive text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        {values.length === 0 && (
          <div className="col-span-4 text-center py-8 text-muted-foreground">Chưa có hình ảnh</div>
        )}
      </div>
    </div>
  )
}
