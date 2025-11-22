"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const supabase = createClient();

export default function UsersPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const [allowed, setAllowed] = useState<boolean | null>(null);

    const [openAdd, setOpenAdd] = useState(false);
    const [newEmail, setNewEmail] = useState("");
    const [newRole, setNewRole] = useState("employee");


    useEffect(() => {
        async function checkRole() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return router.push("/auth/login");

            const { data: profile } = await supabase
                .from("app_users")
                .select("role")
                .eq("id", user.id)
                .single();

            // Only SUPERADMIN should access
            if (!profile || profile.role !== "admin") {
                return router.push("/dashboard");
            }

            setAllowed(true);
        }

        checkRole();
    }, []);

    // Load users only AFTER allowed === true
    useEffect(() => {
        if (!allowed) return;

        async function load() {
            setLoading(true);
            const { data } = await supabase
                .from("app_users")
                .select("*")
                .order("created_at", { ascending: false });

            setUsers(data || []);
            setLoading(false);
        }

        load();
    }, [allowed]);


    if (allowed === null) {
        return (
            <div className="flex items-center justify-center h-40 text-slate-500">
                Checking access…
            </div>
        );
    }

    async function loadUsers() {
        setLoading(true);
        const { data } = await supabase
            .from("app_users")
            .select("id, role, created_at");

        setUsers(data || []);
        setLoading(false);
    }

    async function createUser() {
        if (!newEmail) return;

        // 1. Create auth user
        const { data: authData, error: authErr } = await supabase.auth.admin.createUser({
            email: newEmail,
            email_confirm: false,
        });

        if (authErr) return alert(authErr.message);

        const uid = authData.user.id;

        // 2. Insert into app_users
        const { error } = await supabase
            .from("app_users")
            .insert({
                id: uid,
                role: newRole,
            });

        if (error) return alert(error.message);

        setOpenAdd(false);
        setNewEmail("");
        loadUsers();
    }

    async function deleteUser(id: string) {
        if (!confirm("Delete this user?")) return;

        // 1. Delete auth
        await supabase.auth.admin.deleteUser(id);

        // 2. Delete from app_users
        await supabase.from("app_users").delete().eq("id", id);

        loadUsers();
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Users Management</h1>
                <button
                    onClick={() => setOpenAdd(true)}
                    className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                    <Plus className="h-4 w-4" /> Add User
                </button>
            </div>

            {/* Users List */}
            <div className="rounded-xl border border-slate-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-sm">
                {loading ? (
                    <div className="p-6 text-slate-500">Loading…</div>
                ) : users.length === 0 ? (
                    <div className="p-6 text-slate-500">No users found.</div>
                ) : (
                    <table className="w-full text-sm">
                        <thead className="border-b border-slate-200 dark:border-neutral-700">
                            <tr className="text-left">
                                <th className="p-3">ID</th>
                                <th className="p-3">Role</th>
                                <th className="p-3">Created</th>
                                <th className="p-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u.id} className="border-b border-slate-100 dark:border-neutral-800">
                                    <td className="p-3 font-mono text-xs">{u.id}</td>
                                    <td className="p-3">{u.role}</td>
                                    <td className="p-3">{new Date(u.created_at).toLocaleString()}</td>
                                    <td className="p-3 text-right">
                                        <button
                                            onClick={() => deleteUser(u.id)}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Add User Modal */}
            {openAdd && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() => setOpenAdd(false)}
                    />
                    <div className="relative bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-xl w-full max-w-md space-y-4">
                        <h2 className="text-lg font-semibold">Add New User</h2>

                        <input
                            className="w-full border border-slate-300 dark:border-neutral-700 rounded-lg px-3 py-2 bg-white dark:bg-neutral-800"
                            placeholder="user@example.com"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />

                        <select
                            className="w-full border border-slate-300 dark:border-neutral-700 rounded-lg px-3 py-2 bg-white dark:bg-neutral-800"
                            value={newRole}
                            onChange={(e) => setNewRole(e.target.value)}
                        >
                            <option value="employee">Employee</option>
                            <option value="admin">Admin</option>
                        </select>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setOpenAdd(false)}
                                className="px-4 py-2 border rounded-lg"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={createUser}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
