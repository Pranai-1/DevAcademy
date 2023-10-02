import Link from 'next/link'; 
import { useRouter } from 'next/router';
import LoggedInUserSidebar from './LoggedInUserSidebar';
import LoggedOutUserSidebar from './LoggedOutUserSidebar';

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
    <div className="md:hidden">
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
