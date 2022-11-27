import Heading from '../layout/layoutComponents/Heading';
import ProfileList from './ProfileList';

export default function Profiles() {
  return (
    <div className='wrapContent'>
      <Heading title="Contributors" />
      <ProfileList />
    </div>
  );
}