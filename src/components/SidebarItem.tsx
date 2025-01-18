import React from 'react'

type SidebarItemProps = {
    title: string;
    active: boolean;
    link: string;
}

const SidebarItem = (sidebarItem:SidebarItemProps) => {
    return (
        <li className="relative flex items-center py-2">
            <span>{sidebarItem.title} {sidebarItem.active} {sidebarItem.link}</span>
        </li>
    )
}
export default SidebarItem
