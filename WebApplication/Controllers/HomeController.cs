using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult Philanthropy()
        {
            ViewBag.Message = "Your application description page.";
            return View();
        }

        public ActionResult Enterprise()
        {
            return View();
        }

        public ActionResult Assets()
        {
            return View();
        }

        public ActionResult Exhibitions()
        {
            return View();
        }

    }
}