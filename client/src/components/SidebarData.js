import React from 'react';
import * as AiIco from 'react-icons/ai';
import * as BiIco from 'react-icons/bi';
import * as BsIco from 'react-icons/bs';
import * as io5Ico from 'react-icons/io5';

export const SidebarData = [
    {
        title: 'Administrador',
        path: '/admin',
        icon: <io5Ico.IoPeopleSharp />,
        cName: 'nav-text'
    },
    {
        title: 'Publicación',
        path: '/add',
        icon: <BiIco.BiAddToQueue />,
        cName: 'nav-text'
    },
    {
        title: 'Inicio',
        path: '/home',
        icon: <BiIco.BiHomeAlt2 />,
        cName: 'nav-text'
    },
    {
        title: 'Perfil',
        path: '/profile',
        icon: <AiIco.AiOutlineUser />,
        cName: 'nav-text'
    },
    {
        title: 'Notificaciones',
        path: '/notifications',
        icon: <AiIco.AiOutlineBell />,
        cName: 'nav-text'
    },
    {
        title: 'Chats',
        path: '/chats',
        icon: <BiIco.BiMessageRounded />,
        cName: 'nav-text'
    },
    {
        title: 'Búsqueda',
        path: '/search',
        icon: <AiIco.AiOutlineSearch />,
        cName: 'nav-text'
    },
    {
        title: 'Ajustes',
        path: '/settings',
        icon: <BsIco.BsGear />,
        cName: 'nav-text'
    },
    {
        title: 'Salir',
        path: '/login',
        icon: <io5Ico.IoExitOutline />,
        cName: 'nav-text'
    },
]