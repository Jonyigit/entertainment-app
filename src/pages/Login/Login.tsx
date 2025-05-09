import { Link, useNavigate } from "react-router-dom";
import styleR from "./login.module.scss";
import movieIcon from "../../assets/icon/movie.svg";
import Button from "../../components/ui/Button/Button";
import { useForm } from "react-hook-form";
import { FormDataF } from "../../utils/type";
import { apiClient } from "../../api/index";
import { useState } from "react";
import axios from "axios";

function Login() {
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm<FormDataF>();

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const onSubmit = async (data: FormDataF) => {
        setError(null);
        setIsLoading(true);

        try {
            const response = await apiClient.post("/api/user/login", {
                email: data.email,
                password: data.password,
            });

            const token = response.data.token;
            localStorage.setItem("token", token);

            reset();
            navigate("/", { replace: true });
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || "Invalid email or password");
                setTimeout(() => {
                    setError(null);
                }, 3000);
            } else {
                setError("An unexpected error occurred");
                setTimeout(() => {
                    setError(null);
                }, 3000);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className={styleR["register-container"]}>
            {error && <div className={styleR.errorModal}>{error}</div>}
            <img src={movieIcon} alt="Movie Icon" />
            <form className={styleR.register} onSubmit={handleSubmit(onSubmit)}>
                <h2 className={styleR.title}>Login</h2>
                <div className={styleR.inputs}>
                    <label className={styleR.label}>
                        <input
                            type="email"
                            placeholder="Email address"
                            className={`${styleR.input} ${errors.email ? styleR.error : ""}`}
                            {...register("email", {
                                required: "Can't be empty",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                        {errors.email && <span className={styleR.errorMessage}>{errors.email.message}</span>}
                    </label>
                    <label className={styleR.label}>
                        <input
                            type="password"
                            placeholder="Password"
                            className={`${styleR.input} ${errors.password ? styleR.error : ""}`}
                            {...register("password", {
                                required: "Can't be empty",
                                minLength: {
                                    value: 6,
                                    message: "At least 6 letters",
                                },
                            })}
                        />
                        {errors.password && <span className={styleR.errorMessage}>{errors.password.message}</span>}
                    </label>
                </div>
                <Button type="submit">{isLoading ? "Logging in..." : "Login to your account"}</Button>
                <div className={styleR["register-footer"]}>
                    <span>Don't have an account?</span>
                    <Link to="/sign">Sign Up</Link>
                </div>
            </form>
        </section>
    );
}

export default Login;
