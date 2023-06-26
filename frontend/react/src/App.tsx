import { Formik, FormikErrors } from "formik";
import axios from "axios";

interface LoginFormValues {
  login: string;
  password: string;
}

function App() {
  return (
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
          const sessionResponse = await axios.post("http://127.0.0.1:3000/session", values, { withCredentials: true })
          console.log(sessionResponse);
          const userInfoResponse = await axios.get("http://127.0.0.1:3000/userinfo", { withCredentials: true })
          console.log(userInfoResponse);
          setSubmitting(false);
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
  );
}

export default App;
