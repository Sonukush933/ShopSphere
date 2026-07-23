import Container from '../common/Container';

import Logo from './navbar/Logo';
import DeliverySelector from './navbar/DeliverySelector';
import SearchBar from './navbar/SearchBar';
import DealsButton from './navbar/DealsButton';
import AuthButton from './navbar/AuthButton';
import WishlistButton from './navbar/WishlistButton';
import CartButton from './navbar/CartButton';

function Navbar() {
  return (
    <>
      {/* ================= Desktop ================= */}
      <header className="hidden border-b border-border bg-background lg:block">
        <Container>
          <div className="flex h-[72px] items-center gap-4">
            <Logo />

            <DeliverySelector />

            <SearchBar />

            <DealsButton />

            <AuthButton />

            <WishlistButton />

            <CartButton />
          </div>
        </Container>
      </header>

      {/* ================= Mobile ================= */}
      <header className="border-b border-border bg-background lg:hidden">
        <Container>
          <div className="py-3">
            {/* Row 1 */}
            <div className="flex items-center justify-between">
              <Logo mobile />

              <AuthButton mobile />
            </div>

            {/* Row 2 */}
            <div className="mt-3 flex items-center gap-2">
              <div className="min-w-0 flex-1">
                <SearchBar mobile />
              </div>

              <CartButton mobile />
            </div>
            {/* Row 3 */}
            <div className="mt-3 grid grid-cols-2 gap-3">
              <DealsButton mobile />

              <DeliverySelector mobile />
            </div>
          </div>
        </Container>
      </header>
    </>
  );
}

export default Navbar;
