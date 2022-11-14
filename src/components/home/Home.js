import Heading from '../layout/layoutComponents/Heading';

export default function Home() {
  return (
    <>
      <main>
        <div className="welcome__section" >
          <Heading title="Join the Noroff Community!" />
          <a href="/register" className='cta-btn'>Sign up now</a>
        </div>
        {/* <div>Environment: {process.env.NODE_ENV}</div> */}
      </main>
    </>
  )
}