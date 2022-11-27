import Heading from '../layout/layoutComponents/Heading';
import RegisterForm from './RegisterForm';

export default function Register() {
  return (
    <div className="beforeLogin">
      <div className='loginRegisterSections'>
        <div>
          <Heading title="Sign up" />
          <RegisterForm />
          <div>
            <p>Already have an account?</p>
            <p>Go to <a href='/login'>login</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}