import Link from "next/link";
import cookie from "js-cookie";

function MobileNavbar(props) {
  return (
    <div
      className="absolute flex md:hidden flex-col items-start justify-center w-screen h-screen bg-black bg-opacity-70 z-50"
      onClick={() => props.setMobileNavbar(false)}
    >
      <div
        className="flex flex-col items-start justify-center w-5/6 h-full pl-8 bg-dark-80 space-y-8"
        onClick={(e) => e.stopPropagation()}
      >
        {props.user ? (
          <div className="flex flex-col items-start justify-center space-y-4 w-full">
            <img
              src={
                props.user.minecraft_uuid
                  ? `https://crafatar.com/avatars/${props.user.minecraft_uuid}`
                  : "/images/default_user.png"
              }
              className="w-7/12 select-none"
              draggable={false}
            />
            <h1 className="font-medium text-2xl text-gray-300">
              {props.user.name}
            </h1>
          </div>
        ) : (
          <img
            src="/images/logo.svg"
            className="w-7/12 select-none"
            draggable={false}
          />
        )}
        <div className="flex flex-col items-start justify-center space-y-4 w-full">
          <div className="flex flex-col items-start justify-center w-5/6 bg-dark-70 rounded">
            <Link href="/">
              <div className="flex flex-row items-center justify-start w-full py-2 pl-4 space-x-2 hover:bg-dark-60 cursor-pointer rounded-t">
                <i class="far fa-home-alt w-6 text-xl text-gray-300" />
                <span className="text-xl text-gray-300">Home</span>
              </div>
            </Link>
            <Link href="/servers">
              <div className="flex flex-row items-center justify-start w-full py-2 pl-4 space-x-2 hover:bg-dark-60 cursor-pointer">
                <i class="far fa-th-list w-6 text-xl text-gray-300" />
                <span className="text-xl text-gray-300">Servers</span>
              </div>
            </Link>
            <Link href="/premium">
              <div className="flex flex-row items-center justify-start w-full py-2 pl-4 space-x-2 hover:bg-dark-60 cursor-pointer rounded-b">
                <i class="far fa-gem w-6 text-xl text-gray-300" />
                <span className="text-xl text-gray-300">Premium</span>
              </div>
            </Link>
          </div>
          {props.user ? (
            <div className="flex flex-col items-start justify-center w-5/6 bg-dark-70 rounded">
              <Link href={`/user/${props.user.user_id}`}>
                <div className="flex flex-row items-center justify-start w-full py-2 pl-4 space-x-2 hover:bg-dark-60 cursor-pointer rounded-t">
                  <i class="far fa-eye w-6 text-xl text-gray-300" />
                  <span className="text-xl text-gray-300">View Profile</span>
                </div>
              </Link>
              <div
                className="flex flex-row items-center justify-start w-full py-2 pl-4 space-x-2 hover:bg-dark-60 cursor-pointer"
                onClick={() => props.setEditUserModal(true)}
              >
                <i class="far fa-pencil-paintbrush w-6 text-xl text-gray-300" />
                <span className="text-xl text-gray-300">Edit Profile</span>
              </div>
              <div
                className="flex flex-row items-center justify-start w-full py-2 pl-4 space-x-2 hover:bg-dark-60 cursor-pointer rounded-b"
                onClick={() => cookie.remove("token")}
              >
                <i class="far fa-sign-out-alt w-6 text-xl text-gray-300" />
                <span className="text-xl text-gray-300">Logout</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-start justify-center w-5/6 bg-olive-80 rounded">
              <Link href="/login">
                <div className="flex flex-row items-center justify-start w-full py-2 pl-4 space-x-2 cursor-pointer rounded">
                  <i class="far fa-sign-in-alt w-6 text-xl text-gray-300" />
                  <span className="text-xl text-gray-300">Login</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MobileNavbar;
