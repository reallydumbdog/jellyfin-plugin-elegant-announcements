using System;
using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;
using ElegantAnnouncements.Configuration;

namespace ElegantAnnouncements.Api
{
    [ApiController]
    [Route("ElegantAnnouncements")]
    [Produces(MediaTypeNames.Application.Json)]
    public class AnnouncementController : ControllerBase
    {
        [HttpGet("Status")]
        public ActionResult<object> GetStatus()
        {
            var config = Plugin.Instance.Configuration;
            return new 
            {
                General = new { 
                    Enabled = config.GeneralEnabled, 
                    Message = config.GeneralMessage,
                    Id = config.GeneralId 
                },
                Shutdown = new { 
                    TargetTime = config.ShutdownTimeIso 
                }
            };
        }

        [HttpPost("Update")]
        public ActionResult Update([FromBody] AnnouncementUpdateDto dto)
        {
            var config = Plugin.Instance.Configuration;
            config.GeneralMessage = dto.GeneralMessage;
            config.GeneralEnabled = dto.GeneralEnabled;
            config.GeneralId = dto.GeneralId;
            config.ShutdownTimeIso = dto.ShutdownTimeIso;
            
            Plugin.Instance.UpdateConfiguration(config);
            return Ok();
        }
    }

    public class AnnouncementUpdateDto
    {
        public string GeneralMessage { get; set; }
        public bool GeneralEnabled { get; set; }
        public string GeneralId { get; set; }
        public string ShutdownTimeIso { get; set; }
    }
}