import { useState } from "react"
import { Outlet, Link } from "react-router-dom"
import { SignedIn, SignedOut, UserButton, OrganizationSwitcher, useOrganization } from "@clerk/clerk-react";

function Layout() {
    const { organization } = useOrganization()
    const [menuOpen, setMenuOpen] = useState(false)

    function closeMenu() {
        setMenuOpen(false)
    }

    return <div className={"layout"}>
        <div className={"nav"}>
            <div className={"nav-container"}>
                <Link to={"/"} className={"nav-logo"} onClick={closeMenu}>
                    TaskBoard
                </Link>

                <button
                    className={"nav-menu-button"}
                    type={"button"}
                    aria-expanded={menuOpen}
                    aria-controls={"primary-navigation"}
                    onClick={() => setMenuOpen(open => !open)}
                >
                    <span className={"sr-only"}>{menuOpen ? "Close menu" : "Open menu"}</span>
                    <span aria-hidden={"true"}>{menuOpen ? "x" : "☰"}</span>
                </button>

                <div id={"primary-navigation"} className={`nav-links${menuOpen ? " nav-links-open" : ""}`}>
                    <Link to={"/pricing"} className={"nav-link"} onClick={closeMenu}>
                        Pricing
                    </Link>
                    <SignedOut>
                        <Link to={"/sign-in"} className={"nav-link"} onClick={closeMenu}>
                            Sign In
                        </Link>
                        <Link to={"/sign-up"} className={"btn btn-primary"} onClick={closeMenu}>
                            Sign Up
                        </Link>
                    </SignedOut>
                    <SignedIn>
                        <OrganizationSwitcher
                            hidePersonal
                            afterCreateOrganizationUrl={"dashboard"}
                            afterSelectOrganizationUrl={"dashboard"}
                            createOrganizationMode={"modal"}
                            appearance={{
                                elements: {
                                    organizationSwitcherTrigger: { color: "white" },
                                    organizationSwitcherTriggerIcon: { color: "white" },
                                    userPreviewMainIdentifierText__personalWorkspace: { color: "white" },
                                    organizationPreviewMainIdentifier__organizationSwitcherTrigger: { color: "white" }
                                }
                            }}
                        />
                        {organization &&
                            <Link to={"/dashboard"} className={"nav-link"} onClick={closeMenu}>
                                Dashboard
                            </Link>}
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </div>

        <main>
            <Outlet />
        </main>
    </div>
}

export default Layout