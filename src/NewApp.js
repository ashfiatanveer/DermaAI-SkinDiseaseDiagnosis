  // import React, { useState } from "react";

  // export default function ChatWithImage() {
  //   const [textInput, setTextInput] = useState("");
  //   const [imageFile, setImageFile] = useState(null);
  //   const [textResponse, setTextResponse] = useState(null);
  //   const [imageResponse, setImageResponse] = useState(null);
  //   const [loading, setLoading] = useState(false);
  //   const [textLatency, setTextLatency] = useState(null);
  //   const [imageLatency, setImageLatency] = useState(null);

  //   const handleTextChange = (e) => setTextInput(e.target.value);

  //   const handleImageChange = (e) => {
  //     if (e.target.files.length > 0) setImageFile(e.target.files[0]);
  //     else setImageFile(null);
  //   };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     if (!textInput && !imageFile) {
  //       alert("Please enter text or upload an image.");
  //       return;
  //     }

  //     setLoading(true);
  //     setTextResponse(null);
  //     setImageResponse(null);
  //     setTextLatency(null);
  //     setImageLatency(null);

  //     // Text Model
  //     if (textInput) {
  //       const start = performance.now();
  //       const res = await fetch("http://localhost:5001/chat", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ message: textInput }),
  //       });
  //       const data = await res.json();
  //       setTextLatency((performance.now() - start).toFixed(2) + " ms");
  //       setTextResponse(`${data.response} (Confidence: ${data.confidence}%)`);
  //     }

  //     // Image Model
  //     if (imageFile) {
  //       const formData = new FormData();
  //       formData.append("file", imageFile);

  //       const start = performance.now();
  //       const res = await fetch("http://localhost:5001/predict_image", {
  //         method: "POST",
  //         body: formData,
  //       });
  //       const data = await res.json();
  //       setImageLatency((performance.now() - start).toFixed(2) + " ms");
  //       setImageResponse(`${data.prediction} (Confidence: ${data.confidence}%)`);
  //     }

  //     setLoading(false);
  //   };

  //   return (
  //     <div style={styles.container}>
  //       <div style={styles.header}>
  //          <span
  //           style={{ ...styles.backArrow, cursor: "pointer" }}
  //           onClick={() => window.history.back()}
  //          title="Go back"
  //          >
  //            ←
  //          </span>
  //         <h2 style={styles.title}>Text & Image AI: Output Comparison Dashboard</h2>
  //       </div>

  //       <form onSubmit={handleSubmit} style={styles.form}>
  //         <textarea
  //           placeholder="Type your message here..."
  //           value={textInput}
  //           onChange={handleTextChange}
  //           style={styles.textarea}
  //           rows={4}
  //         />
  //         <input
  //           type="file"
  //           accept="image/*"
  //           onChange={handleImageChange}
  //           style={styles.fileInput}
  //         />
  //         <button type="submit" style={styles.submitBtn} disabled={loading}>
  //           {loading ? "Processing..." : "Send / Upload"}
  //         </button>
  //       </form>

  //       <div style={styles.responseContainer}>
  //         <div style={styles.responseBox}>
  //           <h3>Text Model Response (RoBERTa)</h3>
  //           <div>{textResponse || <i>No text response yet.</i>}</div>
  //           <p>Processing Time: {textLatency || "-"}</p>
  //         </div>

  //         <div style={styles.responseBox}>
  //           <h3>Image Model Response (ResNet50)</h3>
  //           <div>{imageResponse || <i>No image response yet.</i>}</div>
  //           {imageFile && (
  //             <img
  //               src={URL.createObjectURL(imageFile)}
  //               alt="Uploaded"
  //               style={{ maxWidth: "100px", marginTop: 10 }}
  //             />
  //           )}
  //           <p>Processing Time: {imageLatency || "-"}</p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // const styles = {
  //   container: {
  //     maxWidth: 900,
  //     margin: "20px auto",
  //     fontFamily: "'Segoe UI'",
  //     padding: 20,
  //     border: "1px solid #ccc",
  //     borderRadius: 8,
  //     backgroundColor: "#f9f9f9",
  //   },
  //   header: {
  //     display: "flex",
  //     alignItems: "center",
  //     marginBottom: 20,
  //   },
  //   backArrow: {
  //     fontSize: 24,
  //     marginRight: 10,
  //     userSelect: "none",
  //     cursor: "default",
  //   },
  //   title: {
  //     flex: 1,
  //     textAlign: "center",
  //     margin: 0,
  //   },
  //   form: {
  //     display: "flex",
  //     flexDirection: "column",
  //     gap: 12,
  //     marginBottom: 30,
  //   },
  //   textarea: {
  //     padding: 10,
  //     fontSize: 16,
  //     borderRadius: 6,
  //     border: "1px solid #ccc",
  //     resize: "vertical",
  //   },
  //   fileInput: {
  //     fontSize: 16,
  //   },
  //   submitBtn: {
  //     padding: "10px 20px",
  //     fontSize: 16,
  //     backgroundColor: "black",
  //     color: "white",
  //     border: "none",
  //     borderRadius: 6,
  //     cursor: "pointer",
  //   },
  //   responseContainer: {
  //     display: "flex",
  //     gap: 20,
  //     justifyContent: "space-between",
  //   },
  //   responseBox: {
  //     flex: 1,
  //     backgroundColor: "white",
  //     padding: 15,
  //     borderRadius: 6,
  //     boxShadow: "0 0 8px rgba(0,0,0,0.1)",
  //   },
  // };


  import React, { useState } from "react";

  export default function ChatWithImage() {
    const [textInput, setTextInput] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [textResponse, setTextResponse] = useState(null);
    const [imageResponse, setImageResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [textLatency, setTextLatency] = useState(null);
    const [imageLatency, setImageLatency] = useState(null);

    const handleTextChange = (e) => setTextInput(e.target.value);

    const handleImageChange = (e) => {
      if (e.target.files.length > 0) setImageFile(e.target.files[0]);
      else setImageFile(null);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!textInput && !imageFile) {
        alert("Please enter text or upload an image.");
        return;
      }

      setLoading(true);
      setTextResponse(null);
      setImageResponse(null);
      setTextLatency(null);
      setImageLatency(null);

      // Text Model
      if (textInput) {
        const start = performance.now();
        const res = await fetch("http://localhost:5001/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: textInput }),
        });
        const data = await res.json();
        setTextLatency((performance.now() - start).toFixed(2) + " ms");

        // Assuming response is like "DiseaseName" or a longer string, we extract the disease name
        // Here I'm assuming data.response contains disease name directly
        setTextResponse(
          <>
            <div>{data.response}</div>
            <div>
              <strong>Confidence:</strong> {data.confidence}%
            </div>
          </>
        );
      }

      // Image Model
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);

        const start = performance.now();
        const res = await fetch("http://localhost:5001/predict_image", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        setImageLatency((performance.now() - start).toFixed(2) + " ms");

        setImageResponse(
          <>
            <div>{data.prediction}</div>
            <div>
              <strong>Confidence:</strong> {data.confidence}%
            </div>
          </>
        );
      }

      setLoading(false);
    };

    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <span
            style={{ ...styles.backArrow, cursor: "pointer" }}
            onClick={() => window.history.back()}
            title="Go back"
          >
            ←
          </span>
          <h2 style={styles.title}>Text & Image AI: Output Comparison Dashboard</h2>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <textarea
            placeholder="Type your message here..."
            value={textInput}
            onChange={handleTextChange}
            style={styles.textarea}
            rows={4}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={styles.fileInput}
          />
          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? "Processing..." : "Send / Upload"}
          </button>
        </form>

        <div style={styles.responseContainer}>
          <div style={styles.responseBox}>
            <h3>Text Model Response (RoBERTa)</h3>
            <div>{textResponse || <i>No text response yet.</i>}</div>
            <p>
              <strong>Processing Time:</strong> {textLatency || "-"}
            </p>
          </div>

          <div style={styles.responseBox}>
            <h3>Image Model Response (ResNet50)</h3>
            <div>{imageResponse || <i>No image response yet.</i>}</div>
            {imageFile && (
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Uploaded"
                style={{ maxWidth: "100px", marginTop: 10 }}
              />
            )}
            <p>
              <strong>Processing Time:</strong> {imageLatency || "-"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const styles = {
    container: {
      maxWidth: 900,
      margin: "20px auto",
      fontFamily: "'Segoe UI'",
      padding: 20,
      border: "1px solid #ccc",
      borderRadius: 8,
      backgroundColor: "#f9f9f9",
    },
    header: {
      display: "flex",
      alignItems: "center",
      marginBottom: 20,
    },
    backArrow: {
      fontSize: 24,
      marginRight: 10,
      userSelect: "none",
    },
    title: {
      flex: 1,
      textAlign: "center",
      margin: 0,
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
      marginBottom: 30,
    },
    textarea: {
      padding: 10,
      fontSize: 16,
      borderRadius: 6,
      border: "1px solid #ccc",
      resize: "vertical",
    },
    fileInput: {
      fontSize: 16,
    },
    submitBtn: {
      padding: "10px 20px",
      fontSize: 16,
      backgroundColor: "black",
      color: "white",
      border: "none",
      borderRadius: 6,
      cursor: "pointer",
    },
    responseContainer: {
      display: "flex",
      gap: 20,
      justifyContent: "space-between",
    },
    responseBox: {
      flex: 1,
      backgroundColor: "white",
      padding: 15,
      borderRadius: 6,
      boxShadow: "0 0 8px rgba(0,0,0,0.1)",
    },
  };
