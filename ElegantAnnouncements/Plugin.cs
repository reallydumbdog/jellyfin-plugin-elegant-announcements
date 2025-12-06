using System;
using System.Collections.Generic;
using MediaBrowser.Common.Configuration;
using MediaBrowser.Common.Plugins;
using MediaBrowser.Model.Plugins;
using MediaBrowser.Model.Serialization;
using ElegantAnnouncements.Configuration;

namespace ElegantAnnouncements
{
    public class Plugin : BasePlugin<PluginConfiguration>
    {
        public override string Name => "Elegant Announcements";
        public override Guid Id => Guid.Parse("95286550-2d6d-4680-874b-57a414b3d735");

        public Plugin(IApplicationPaths applicationPaths, IXmlSerializer xmlSerializer)
            : base(applicationPaths, xmlSerializer)
        {
            Instance = this;
        }

        public static Plugin Instance { get; private set; }
    }
}