import { Copyright, Film, Mail, Phone } from "lucide-react"
export const Footer = () => {
    return (
        <div className="pt-10 pb-5 px-5 mt-8 bg-indigo-700 text-[#fafafa] text-sm">
            <div>
                <div className="flex gap-2 items-center">
                    <Film size={20} color="#fafafa" strokeWidth={1} />
                    <p className="text-[#fafafa] italic text-base font-bold">Movie Z</p>
                </div>
                <div className="flex gap-1 items-center mt-3">
                <Copyright size={16} strokeWidth={1} />
                <p>2024 MovieZ. All Right Reversed.</p>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-12 mt-7">
            <div className="col-span-2">
                <p className="mb-3">Contact Information</p>
                <div className="mb-6 flex items-center gap-3">
                <Mail size={16} strokeWidth={2} />
                    <div>
                    <p>Email:</p>
                    <p>support@movieZ.com</p>
                    </div>
                </div>
                <div className="mb-6 flex items-center gap-3">
                <Phone size={16} strokeWidth={2} />
                    <div>
                    <p>Phone:</p>
                    <p>+976 (11) 123-456</p>
                    </div>
                </div>
            </div>
            <div>
                <p>Follow Us</p>
                <p className="mt-3">Facebook</p>
                <p className="mt-3">Instagram</p>
                <p className="mt-3">Twitter</p>
                <p className="mt-3">Youtube</p>
            </div>
            </div>
        </div>
    )
}