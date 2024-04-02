import { pricingFormat } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const Cart = () => {
  //mock for cart content until dynamic cart functionality implemeneted
  const cartContent = 1;
  const fee = 700;

  return (
    <Sheet>
      {/* tailwind group allows for hover triggers from different groups */}
      <SheetTrigger className="group -m-2 flex items-center p-2">
        <ShoppingCart
          aria-hidden="true"
          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
        />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          1
        </span>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Cart(0)</SheetTitle>
        </SheetHeader>
        {cartContent > 0 ? (
          <>
            <div className="flex w-full flex-col pr-6">
              {/* {cart logic} */}
              cart content
            </div>
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 pr-6">
                <div className="flex">
                  <span className="flex-1">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Transaction Fee</span>
                  <span>{pricingFormat(fee)}</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Total</span>
                  <span>{pricingFormat(fee)}</span>
                </div>
              </div>
              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href="/cart"
                    className={buttonVariants({ className: "w-full" })}
                  >
                    Continue to Checkout
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div className="relative mb-4 h-60 w-60 text-muted-foreground">
              <Image src="/EmptyCart.png" fill alt="empty shopping cart" />
            </div>
            <div className="text-xl font-semibold"> Your cart is empty</div>
            <SheetTrigger asChild>
              <Link
                href="/market"
                className={buttonVariants({
                  variant: "link",
                  size: "sm",
                  className: "text-sm text-muted-foreground",
                })}
              >
                Pick up some work ?
              </Link>
            </SheetTrigger>
            <div className="text-sm font-semibold">or</div>
            <SheetTrigger asChild>
              <Link
                href="/dashboard"
                className={buttonVariants({
                  variant: "link",
                  size: "sm",
                  className: "text-sm text-muted-foreground",
                })}
              >
                Get help with your own project?
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
