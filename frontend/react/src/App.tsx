import axios from "axios";
import { Formik, FormikErrors } from "formik";
import { ReactNode, useEffect } from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";

const router = createHashRouter([
  {
    path: "/authentification",
    element: <AuthPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
]);

interface LoginFormValues {
  login: string;
  password: string;
}

function ProfilePage(): ReactNode {
  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
}

function AuthPage(): ReactNode {
  return (
    <div>
      <h1>Authentification</h1>
      <Formik<LoginFormValues>
        initialValues={{ login: "", password: "" }}
        validate={(values) => {
          const errors = {} as FormikErrors<LoginFormValues>;

          if (!values.login) {
            errors.login = "Required";
          }

          if (!values.password) {
            errors.password = "Required";
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          await axios.post("http://127.0.0.1:3000/session", values, {
            withCredentials: true,
          });
          await axios.get("http://127.0.0.1:3000/userinfo", {
            withCredentials: true,
          });
          setSubmitting(false);
          window.location.hash = "/profile";
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="login"
              name="login"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.login}
            />
            {errors.login && touched.login && errors.login}

            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

function App() {
  useEffect(() => {
    (async () => {
      try {
        const userInfoResponse = await axios.get(
          "http://127.0.0.1:3000/userinfo",
          { withCredentials: true }
        );
        console.log("INIT", userInfoResponse);
        window.location.hash = "/profile";
      } catch (e) {
        window.location.hash = "/authentification";
      }
    })();
  }, []);

  // TODO: Loader

  return <RouterProvider router={router} />;
}

export default App;
