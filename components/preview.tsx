import React from 'react'
import Image from 'next/image'
export default function Preview({ selectedFile }: any) {

  const reader = new window.FileReader()

  reader.onload = (e: any) => {
    const res = e.target.result
    return res
  }

  if (selectedFile) {
    reader.readAsDataURL(selectedFile)
  }
  return (
    <div>
      {selectedFile ? <Image src={URL.createObjectURL(selectedFile)} alt="image" height={600} width={440} layout="responsive" /> : null}
    </div>
  )
}
