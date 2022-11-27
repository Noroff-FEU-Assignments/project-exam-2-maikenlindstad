import Heading from '../layout/layoutComponents/Heading';
import preview from '../../images/preview.png';

export default function Home() {
  return (
    <div className="beforeLogin">
      <div className='welcomeSection'>
        <div>
          <img src={preview} className="previewImg" alt="Preview image." />
        </div>
        <div className='welcomeSection__information'>
          <Heading title="Join the Noroff Community!" />
          <div className='beforeLogin__cardSection'>
            <a href="/register" className='cta-btn'>Sign up today</a>
            <p>Already have an account?</p><a href="/login"> Go to Login</a>
          </div>
          <div>
            <p>NO.CO, Noroff Community, is a social media app for the students and teachers of Noroff.
              As a student or teacher you have been provided with a stud.noroff.no or a noroff.no email account
              Enter the app using your provided e-mail.</p>
            <p>If you have trouble entering your account, please contact Noroff <a href="">here</a>.</p>
          </div>
        </div>
      </div>
    </div>
  )
}