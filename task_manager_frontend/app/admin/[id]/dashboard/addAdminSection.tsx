'use client'
import DynamicIcon from "@/utill/DynamicIcon";

export function AddAdminSection({ showForm }: { showForm: (show: boolean) => void }) {
    return (
        <section id="add-admin">
            <div className="flex items-center justify-between lg:px-15 p-5 bg-white shadow-md my-5 lg:mx-auto rounded-xl">
                <h1 className="text-md md:text-lg lg:text-xl">
                    Register a new Admin
                </h1>
                <button
                    onClick={() => showForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md flex gap-2 items-center"
                >
                    <DynamicIcon name="FaPlus" />
                    New Admin
                </button>
            </div>
        </section>
    );
}