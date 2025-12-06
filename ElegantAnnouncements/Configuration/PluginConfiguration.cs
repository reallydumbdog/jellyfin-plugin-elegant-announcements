using MediaBrowser.Model.Plugins;

namespace ElegantAnnouncements.Configuration
{
    public class PluginConfiguration : BasePluginConfiguration
    {
        public string GeneralMessage { get; set; } = "Welcome to Jellyfin!";
        public bool GeneralEnabled { get; set; } = true;
        public string GeneralId { get; set; } = "v1"; 
        public string ShutdownTimeIso { get; set; } = ""; 

        public PluginConfiguration()
        {
        }
    }
}