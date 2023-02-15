import { postSchema } from "./validation";
import styles from "./styles.module.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import { useState } from "react";
import { FadeLoader } from "react-spinners";

function App() {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const initialValues = {
    name: "",
    email: "",
    prompt: "",
    acceptTerms: false,
  };

  const createPost = async (event) => {
    const data = {
      name: event.name,
      email: event.email,
      prompt: event.prompt,
    };
    setLoading(true);
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setImage(response.data.image);
      setLoading(false);
    } catch (err) {
      setError("Make sure you did not put any 18+ stuff in text. :)");
    }
    setLoading(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={postSchema}
      onSubmit={createPost}
    >
      {({ errors, touched, resetForm }) => (
        <div className={styles.wrapper}>
          {loading && (
            <div className={styles.loading}>
              <FadeLoader
                color="#000"
                loading={loading}
                cssOverride={{}}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          )}
          <div className={styles.container}>
            <Form>
              <div className="form-group">
                <label>Full Name</label>
                <Field
                  name="name"
                  type="text"
                  className={
                    "form-control" +
                    (errors.name && touched.name ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email"> Email </label>
                <Field
                  name="email"
                  type="email"
                  className={
                    "form-control" +
                    (errors.email && touched.email ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-group">
                <label>Generate image from this text</label>
                <Field
                  name="prompt"
                  type="text"
                  className={
                    "form-control" +
                    (errors.prompt && touched.prompt ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="prompt"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-group form-check">
                <Field
                  name="acceptTerms"
                  type="checkbox"
                  className={
                    "form-check-input" +
                    (errors.acceptTerms && touched.acceptTerms
                      ? " is-invalid"
                      : "")
                  }
                />
                <label htmlFor="acceptTerms" className="form-check-label">
                  I have read and agree to the Terms
                </label>
                <ErrorMessage
                  name="acceptTerms"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-group">
                <button type="submit" className={styles.submit_button}>
                  Register
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setImage(null);
                    setError(null);
                  }}
                  className="btn btn-warning float-right"
                >
                  Reset
                </button>
              </div>
            </Form>
            {error && <div className={styles.error}>{error}</div>}
          </div>
          <div className={styles.image_wrapper}>
            <h2>Generated image will be shown here</h2>
            {image && <img src={image} className={styles.image} alt="image" />}
          </div>
        </div>
      )}
    </Formik>
  );
}

export default App;
