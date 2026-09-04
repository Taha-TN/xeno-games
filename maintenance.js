/* ==========================================
   XENO GAMES — GLOBAL MAINTENANCE SYSTEM
========================================== */

/*
   CHANGE ONLY THIS:

   true  = maintenance ON
   false = maintenance OFF
*/

const MAINTENANCE_MODE = false;


/* ==========================================
   DO NOT EDIT BELOW THIS LINE
========================================== */

(function () {

    const maintenancePage = "maintenance.html";

    /*
       Pages that should NEVER redirect.
       Otherwise maintenance.html would
       redirect to itself forever.
    */
    const excludedPages = [
        maintenancePage
    ];

    /*
       Get the current page filename.
       Example:
       /Xeno-Games/index.html
       becomes:
       index.html
    */
    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase() || "index.html";


    /*
       Check whether this page is excluded.
    */
    const isExcluded =
        excludedPages.includes(currentPage);


    /*
       If maintenance is enabled,
       redirect normal pages.
    */
    if (MAINTENANCE_MODE && !isExcluded) {

        window.location.replace(maintenancePage);

        return;
    }


    /*
       If maintenance is disabled,
       everything works normally.
    */
    console.log(
        MAINTENANCE_MODE
            ? "Xeno Games: Maintenance Mode ACTIVE"
            : "Xeno Games: Maintenance Mode OFF"
    );

})();
