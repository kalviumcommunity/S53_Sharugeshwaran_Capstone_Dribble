// import React, {useCallback} from 'react'



// function Drop() {
//   const onDrop = useCallback(acceptedFiles => {
//     // Filter out any non-file items from acceptedFiles array
//     const files = acceptedFiles.filter(file => file instanceof File);
    
//     // Do something with the files
//     console.log(files);
//     // addToCloudinary(files);
//   }, []);
//   const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

//   return (
//     <div {...getRootProps()}>
//       <input {...getInputProps()} />
//       {
//         isDragActive ?
//           <p>Drop the files here ...</p> :
//           <p>Drag 'n' drop some files here, or click to select files</p>
//       }
//     </div>
//   )
// }

// export default Drop