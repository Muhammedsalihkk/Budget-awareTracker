import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import CustomInput from "../components/ui/Input";
import CustomButton from "../components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/services/authApi";
import toast from "react-hot-toast";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email!").required("Email is required"),
  password: Yup.string().min(6).required("Password is required"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = async (values, helpers) => {
    try {
      const res = await dispatch(loginUser(values));
      
      
      if(res.payload.success){
        toast.success("Logged in successfully!");
        navigate("/dashboard");
      }
      else{
        toast.error(res.payload.message || "Login failed!");
      }
   
    } catch (error) {
      
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center py-6 px-4">
      <div className="p-6 sm:p-8 bg-white shadow-lg rounded-xl w-full max-w-sm md:max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-2">
          Budget Tracker
        </h2>
        <p className="text-sm text-center text-gray-600 mb-6">
          Welcome back! Sign in to continue.
        </p>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
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
            <form onSubmit={handleSubmit} className="space-y-5">
              <CustomInput
                label="Email Address"
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
              {error && (
                <div className="text-red-500 text-sm text-center">
                  {error.message}
                </div>
              )}

              <CustomButton
                label="Log In"
                htmlType="submit"
                loading={isSubmitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              />

              <p className="text-sm text-center text-gray-500">
                No account?{" "}
                <Link
                  to="/register"
                  className="text-indigo-600 font-medium hover:underline"
                >
                  Sign up here
                </Link>
              </p>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
