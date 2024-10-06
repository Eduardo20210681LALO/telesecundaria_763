import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons"; // Importamos los íconos

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
              <Link to="/">
                <HomeOutlined /> {/* Ícono de casa en la primera ruta */}
                <span>Inicio</span>
              </Link>
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item>
              <HomeOutlined />
              <span>Inicio</span>
            </Breadcrumb.Item>
          )}
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            return isLast ? (
              <Breadcrumb.Item key={index}>
                <UserOutlined /> {/* Ícono de usuario en el último breadcrumb */}
                <span>{capitalize(name)}</span>
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item key={index}>
                <Link to={routeTo}>
                  <UserOutlined /> {/* Ícono de usuario en los breadcrumbs intermedios */}
                  <span>{capitalize(name)}</span>
                </Link>
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