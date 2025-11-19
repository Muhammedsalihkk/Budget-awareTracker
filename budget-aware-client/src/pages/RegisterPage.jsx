  import { Formik } from "formik";
  import * as Yup from "yup";
  import { Link, useNavigate } from "react-router-dom";
  import CustomInput from "../components/ui/Input";
  import CustomButton from "../components/ui/Button";
  import { registerUser } from "../redux/services/authApi";
  import { useDispatch, useSelector } from "react-redux";
  import toast from "react-hot-toast";

  const RegisterSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email!").required("Email is required"),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm your password"),
  });

  const RegisterPage = () => {
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    
    const dispatch = useDispatch();
    const handleRegister = async (values, { resetForm }) => {
      console.log("he;loo");
      try {

        const res = await dispatch(registerUser(values));
        console.log(res);
        
        if (res.payload.success) {
          toast.success(`${res.payload.data}Registered successfully!`);
          navigate("/");
        }
      } catch (error) {
        console.error("Registration failed:", error);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center py-6 px-4">
        <div className="p-6 sm:p-8 bg-white shadow-lg rounded-xl w-full max-w-sm md:max-w-md">
          <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-2">
            Create Account
          </h2>
          <p className="text-sm text-center text-gray-600 mb-6">
            Start managing your expenses today.
          </p>

          <Formik
            initialValues={{
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={RegisterSchema}
            onSubmit={handleRegister}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              touched,
              isSubmitting,
            }) => (
              <form  onSubmit={handleSubmit} className="space-y-5">

                <CustomInput
                submit="submit"
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="youremail@example.com"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && errors.email}
                />

                <CustomInput
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && errors.password}
                />

                <CustomInput
                
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  placeholder="Re-enter your password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.confirmPassword && errors.confirmPassword}
                />
                {error && (
                  <div className="text-red-500 text-sm text-center">
                    {error.message}
                  </div>
                )}
                <CustomButton
                  label="Sign Up"
                  htmlType="submit"
                  loading={isSubmitting}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                />

                <p className="text-sm text-center text-gray-500 mt-4">
                  Already have an account?{" "}
                  <Link
                    to="/"
                    className="text-indigo-600 font-medium hover:underline"
                  >
                    Log in
                  </Link>
                </p>
              </form>
            )}
          </Formik>
        </div>
      </div>
    );
  };

  export default RegisterPage;
