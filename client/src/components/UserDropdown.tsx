import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { User, Settings, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';





const UserDropdown = () => {
    const router = useRouter();


    const handleNavigate = (path : any) => {
        router.push(path);
    };


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full">
                    <User className="mr-2 h-5 w-5" />
                    Profile
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-background shadow-lg rounded-md p-1">
                <DropdownMenuLabel className="px-2 py-1 text-gray-700">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="px-2 py-1 hover:bg-gray-100">
                    My Bookings
                </DropdownMenuItem>
                <DropdownMenuItem className="px-2 py-1 hover:bg-gray-100" onClick={() => handleNavigate('/account/listings')}>
                    My Listings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="px-2 py-1 hover:bg-gray-100">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="px-2 py-1 hover:bg-gray-100">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserDropdown;
