import Logo from "./navbar/Logo";
import SearchBar from "./navbar/SearchBar";
import DealsButton from "./navbar/DealsButton";
import DeliverySelector from "./navbar/DeliverySelector";
import AuthButton from "./navbar/AuthButton";
import CartButton from "./navbar/CartButton";

function MobileNavbar() {
  return (
    <header className="bg-background px-4 py-4 lg:hidden">
      {/* Row 1 */}
      <div className="flex items-center justify-between">
        <Logo />

        <div className="flex items-center gap-3">
          <CartButton />

          <AuthButton />
        </div>
      </div>

      {/* Row 2 */}
      <div className="mt-4">
        <SearchBar />

        <div className="mt-3 grid grid-cols-2 gap-3">
          <DealsButton />

          <DeliverySelector />
        </div>
      </div>
    </header>
  );
}

export default MobileNavbar;