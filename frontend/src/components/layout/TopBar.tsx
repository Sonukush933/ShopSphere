import Container from "../common/Container";

function TopBar() {
  return (
    <div className="bg-primary text-white text-xs">
      <Container>
        <div className="flex h-8 items-center justify-between">
          <div className="flex gap-5">
            <button>About Us</button>
            <button>My Account</button>
            <button>
              We deliver to you every day from 7:00 to 23:00
            </button>
          </div>

          <div>
            English
          </div>
        </div>
      </Container>
    </div>
  );
}

export default TopBar;