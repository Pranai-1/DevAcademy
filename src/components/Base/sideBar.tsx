import Link from 'next/link'; 
import { useRouter } from 'next/router';
import LoggedInUserSidebar from '../User/LoggedInUserSidebar';
import LoggedOutUserSidebar from '../User/LoggedOutUserSidebar';

interface Props {
  bar: boolean;
  userEmail: string | null;
  sidebar(): void;
  logout(): void;
  closeSidebar(): void;
}

const Sidebar = (props: Props) => {
  let { bar, userEmail, sidebar, logout, closeSidebar } = props;
  const router = useRouter(); 
 
 
  return (
    <div className="md:hidden z-10">
      <button
        className="font-bold text-3xl ml-2 cursor-pointer"
        onClick={sidebar}
      >
        &#8801;
      </button>
      {bar && (
        userEmail ? (
         <LoggedInUserSidebar closeSidebar={closeSidebar}/>
        ) : (
          <LoggedOutUserSidebar closeSidebar={closeSidebar}/>
        )
      )}
    </div>
  );
};

export default Sidebar;
