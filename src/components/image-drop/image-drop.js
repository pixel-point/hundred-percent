import React, { useState } from "react"
import { useDropzone } from "react-dropzone"
import classNames from "classnames/bind"
import styles from "./image-drop.module.scss"

const ImageDrop = props => {
  const [files, setFiles] = useState([])
  const { acceptedFiles, getRootProps, isDragActive } = useDropzone({
    accept: "image/png,image/jpg,image/jpeg",
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    },
  })
  const cx = classNames.bind(styles)
  const message = isDragActive ? "Drop it" : "Drag 'n' drop your x2 design here"
  const thumbs = files.map(file => (
    <div key={file.name}>
      <img
        src={file.preview}
        srcSet={`${file.preview} 2x`}
        alt={file.name}
        className={styles.img}
      />
    </div>
  ))

  return (
    <>
      {files.length === 0 ? (
        <div
          className={cx("container", { active: isDragActive })}
          {...getRootProps()}
        >
          <div>
            <div>{message}</div>
          </div>
        </div>
      ) : (
        <>{thumbs}</>
      )}
    </>
  )
}

export default ImageDrop
