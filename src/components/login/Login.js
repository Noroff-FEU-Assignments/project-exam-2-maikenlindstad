import Heading from '../layout/layoutComponents/Heading';
import LoginForm from './LoginForm';

export default function Login() {
  return (
    <>
      <div className="beforeLoginWrapper">
        <div className='loginRegisterSections'>
          <div>
            <Heading title="Login" />
            <LoginForm />
            <div>
              <p>Don't have an account?</p>
              <p>Go to <a href='/register'>Sign up</a></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}