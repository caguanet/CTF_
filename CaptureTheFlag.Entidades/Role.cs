using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CaptureTheFlag.Entidades
{
    public class Role
    {
        public long? id { get; set; }
        public string roleName { get; set; }
        public string description { get; set; }
    }
}