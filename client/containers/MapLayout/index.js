/* @flow */

import React from 'react';
import {connect} from 'react-redux';

import {ROLES} from '../../constants/user';

import MapSettingsToggler from '../MapSettingsToggler';
import NodeListToggler from '../NodeListToggler';
import AdminPageLink from '../AdminPageLink';
import FileUploadPageLink from '../FileUploadPageLink';
import UserSettingsLink from '../UserSettingsLink';

import MapSettings from '../MapSettings';
import NodeList from '../NodeList';

import css from './style.css';

type MapLayoutProps = {
    showMapSettings: boolean,
    showNodeList: boolean,
    isAdmin: boolean,
};

const MapLayout = ({
    showMapSettings,
    showNodeList,
    isAdmin,
}: MapLayoutProps) => (
    <div className={css.layout}>
        <div className={css.content}>
            {
                showMapSettings && <MapSettings />
            }
            {
                showNodeList && <NodeList />
            }
        </div>
        <div className={css.settings}>
            <MapSettingsToggler />
            <NodeListToggler />
            {isAdmin && <AdminPageLink />}
            {/* {isAdmin && <FileUploadPageLink />} */}
            <UserSettingsLink />
        </div>
    </div>
);

const mapStateToProps = state => {
    const {settings} = state.map;
    const {user} = state;

    return {
        showMapSettings: settings.showMapSettings,
        showNodeList: settings.showNodeList,
        isAdmin: user.actions.includes(ROLES.ADMIN.id),
    };
};

const enhance = connect(mapStateToProps);

export default enhance(MapLayout);
