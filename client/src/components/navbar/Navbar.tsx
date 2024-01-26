
import "./navbar.scss"

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="logo">
        <img src="logo.svg" alt="" />
        <span>ShAdmin</span>
      </div>
      <div className="icons">
        <img src="/search.svg" alt="" className='icon'/>
        <img src="/app.svg" alt="" className='icon'/>
        <img src="/expand.svg" alt="" className='icon'/>
        <div className="notifications">
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div>
        <div className="user">
          <img src="/users.jpg" alt="" />
          <span>Shah</span>
        </div>
        <img src="/settings.svg" alt="" />
      </div>
    </div>
  )
}

export default Navbar
