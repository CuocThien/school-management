import { ComponentFactoryResolver, ComponentRef, ViewContainerRef } from '@angular/core';

/**
 * Handle lazy loading component when scroll
 */


const checkDevicesMobile = (screenWidth: any): boolean => {
  if (screenWidth < 768) return true;
  return false;
};

const handleLazyLoadComponent =
  (component: any, viewContainer: ViewContainerRef, componentFactory: ComponentFactoryResolver, passData?: any) => {
    const cmpRef: ComponentRef<typeof component> = viewContainer.createComponent(
      componentFactory.resolveComponentFactory(component)
    );
    cmpRef.instance.listClub = passData?.listClub ? passData.listClub : [];
    cmpRef.instance.userInfo = passData?.userInfo ? passData.userInfo : [];
  };

export {
  handleLazyLoadComponent,
  checkDevicesMobile
};

