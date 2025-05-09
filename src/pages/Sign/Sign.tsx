import { Link, useNavigate } from "react-router-dom";
import styleR from "./sign.module.scss";
import movieIcon from "../../assets/icon/movie.svg";
import { FormDataS } from "../../utils/type";
import { useForm } from "react-hook-form";
import Button from "../../components/ui/Button/Button";
import { apiClient } from "../../api/index";
import { useState } from "react";

function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormDataS>();

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const navigate = useNavigate();

    const onSubmit = async (data: FormDataS) => {
        setError(null);
        setIsLoading(true);

        try {
            const response = await apiClient.post("/api/user/register", {
                full_name: data.fullName,
                email: data.email,
                password: data.password,
            });

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                navigate("/");
            }

            reset();
        } catch (err) {
            setError("Ro'yxatdan o'tishda xatolik yuz berdi");
            console.error("Registration error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className={styleR["register-container"]}>
            {error && <div className={styleR.errorModal}>{error}</div>}
            <img src={movieIcon} alt="Movie Icon" />
            <form className={styleR.register} onSubmit={handleSubmit(onSubmit)}>
                <h2 className={styleR.title}>Sign Up</h2>
                <div className={styleR.inputs}>
                    <label className={styleR.label}>
                        <input
                            type="text"
                            placeholder="Full name"
                            className={`${styleR.input} ${errors.fullName ? styleR.error : ""}`}
                            {...register("fullName", {
                                required: "Can't be blank",
                                minLength: {
                                    value: 3,
                                    message: "At least 3 letters",
                                },
                            })}
                        />
                        {errors.fullName && <span className={styleR.errorMessage}>{errors.fullName.message}</span>}
                    </label>
                    <label className={styleR.label}>
                        <input
                            type="email"
                            placeholder="Email address"
                            className={`${styleR.input} ${errors.email ? styleR.error : ""}`}
                            {...register("email", {
                                required: "Can't be blank",
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
                                required: "Can't be blank",
                                minLength: {
                                    value: 6,
                                    message: "At least 6 letters",
                                },
                            })}
                        />
                        {errors.password && <span className={styleR.errorMessage}>{errors.password.message}</span>}
                    </label>
                </div>
                <Button type="submit">{isLoading ? "Loading..." : "Create an account"}</Button>
                <div className={styleR["register-footer"]}>
                    <span>Already have an account?</span>
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </section>
    );
}

export default Register;
