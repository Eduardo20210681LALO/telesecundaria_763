import React from "react";
import { useLocation, Link } from "react-router-dom";
<<<<<<< HEAD
import { Breadcrumb } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons"; // Importamos los íconos

const BreadCrumb = () => {
  const location = useLocation();

=======
import { Breadcrumb } from "antd";//MIGAJAS DE PAN

const BreadCrumb = () => {
  const location = useLocation();
  
>>>>>>> 728f6c1fe90a13ac054225c47d3d02a60e1cf668
  const BreadCrumbView = () => {
    const { pathname } = location;
    const pathnames = pathname.split("/").filter((item) => item);
    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
<<<<<<< HEAD

=======
    
>>>>>>> 728f6c1fe90a13ac054225c47d3d02a60e1cf668
    return (
      <div>
        <Breadcrumb>
          {pathnames.length > 0 ? (
            <Breadcrumb.Item>
<<<<<<< HEAD
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
=======
              <Link to="/">Inicio</Link>
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item>Inicio</Breadcrumb.Item>
>>>>>>> 728f6c1fe90a13ac054225c47d3d02a60e1cf668
          )}
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            return isLast ? (
<<<<<<< HEAD
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
=======
              <Breadcrumb.Item key={index}>{capitalize(name)}</Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item key={index}>
                <Link to={routeTo}>{capitalize(name)}</Link>
>>>>>>> 728f6c1fe90a13ac054225c47d3d02a60e1cf668
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      </div>
    );
  };
<<<<<<< HEAD

  return <>{BreadCrumbView()}</>;
};

export default BreadCrumb;
=======
  return <>{BreadCrumbView()}</>;
};

export default BreadCrumb;
>>>>>>> 728f6c1fe90a13ac054225c47d3d02a60e1cf668
