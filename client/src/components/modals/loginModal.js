import useLoginModal from "../../hooks/useLoginModel";
import { useCallback, useEffect, useState } from "react";
import Input from "../input"
import Modal from "./modal";
import useRegisterModal from "../../hooks/useRegisterModel";
import { useDispatch } from "react-redux";
import { signIn } from '../../actions/auth';
import { useNavigate } from "react-router-dom"


function LoginModal() {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        if (!loginModal.isOpen) {
            setPassword("")
            setEmail("")
        }
    }, [loginModal])
    
    const onToggle = useCallback(() => {
        if (isLoading) {
            return;
        }

        loginModal.onClose();
        registerModal.onOpen();
    }, [isLoading, registerModal, loginModal])

    const onSubmit = useCallback(async (e) => {
        try {
            setIsLoading(true);
            e.preventDefault();
            const formData = { email: email, password: password};
            dispatch(signIn(formData, navigate, loginModal));
            
            setEmail('');
            setPassword('');

        } catch (error){
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [loginModal, email, password, navigate, dispatch]);

    const bodyContent = (
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                maxLength={30}
                value={email}
                required={true}
                disabled={isLoading}
            />
            <Input
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                maxLength={30}
                required={true}
                value={password}
                disabled={isLoading}
            />
            <div className='flex flex-col gap-2 pt-10'>
                            <button type="submit" className='
                                w-full
                                font-semibold
                                rounded-full
                                text-xl
                                text-[#0B0C10]
                                px-4
                                py-2
                                transition
                                hover:opacity-80
                                bg-gradient-to-r from-cyan-500 to-cyan-800 '>
                                    Sign In
                </button>
            </div>
        </form>
    )

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>Dont have an account?  
                <span
                    onClick={onToggle}
                    className="
                        text-white
                        cursor-pointer"> Create an account</span>
            </p>

        </div>
    )

    return (
        <div>
            <Modal
                disabled={isLoading}
                isOpen={loginModal.isOpen}
                title="Login"
                onClose={loginModal.onClose}
                onSubmit={onSubmit}
                body={bodyContent}
                footer={footerContent}/>
        </div>
    )
}

export default LoginModal;