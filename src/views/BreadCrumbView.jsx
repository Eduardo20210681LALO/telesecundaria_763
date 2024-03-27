import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";//MIGAJAS DE PAN

const BreadCrumb = () => {
  const location = useLocation();
  
  const BreadCrumbView = () => {
    const { pathname } = location;
    const pathnames = pathname.split("/").filter((item) => item);
    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    
    return (
      <div>
        <Breadcrumb>
          {pathnames.length > 0 ? (
            <Breadcrumb.Item>
              <Link to="/">Inicio</Link>
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item>Inicio</Breadcrumb.Item>
          )}
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            return isLast ? (
              <Breadcrumb.Item key={index}>{capitalize(name)}</Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item key={index}>
                <Link to={routeTo}>{capitalize(name)}</Link>
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      </div>
    );
  };
  return <>{BreadCrumbView()}</>;
};

export default BreadCrumb;