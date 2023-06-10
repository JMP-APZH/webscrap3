import { Link, useMatch, useResolvedPath, useLocation } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="nav text-center p-4 w-full">
      <Link to="/" className="site-title text-2xl text-white">
        Project Prices Observer
      </Link>
      <div className="flex flex-col items-center p-6 text-xl">
        <div className="flex pb-8">
        <CustomLink to="/boissons" className='text-white font-bold border p-2'>Boissons</CustomLink>
        <CustomLink to="/dairy" className='text-white font-bold border p-2'>Dairy</CustomLink>
        <CustomLink to="/dairy2" className='text-white font-bold border p-2'>Dairy 2</CustomLink>
        <CustomLink to="/entretien" className='text-white font-bold border p-2'>Entretien</CustomLink>
        </div>
        <div className="flex">
        <CustomLink to="/fruits-legumes" className='text-white font-bold border p-2'>Fruits & Légumes</CustomLink>
        <CustomLink to="/surgeles" className='text-white font-bold border p-2'>Surgelés</CustomLink>
        <CustomLink to="/viandes-poissons" className='text-white font-bold border p-2'>Viandes & Poissons</CustomLink>
        </div>
        
        
      </div>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link 
        className=""
        to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}