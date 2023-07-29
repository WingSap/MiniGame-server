using UnityEngine;
using System.Collections;
using System.IO;
using UnityEngine.Networking;

public class ImageUploader : MonoBehaviour
{
    public string serverURL = "http://your-server-url/upload_image";

    public void UploadImage(Texture2D imageTexture)
    {
        StartCoroutine(SendImageToServer(imageTexture));
    }

    private IEnumerator SendImageToServer(Texture2D imageTexture)
    {
        byte[] imageBytes = imageTexture.EncodeToPNG();
        string imageBase64 = System.Convert.ToBase64String(imageBytes);

        WWWForm form = new WWWForm();
        form.AddField("image", imageBase64);

        UnityWebRequest request = UnityWebRequest.Post(serverURL, form);
        yield return request.SendWebRequest();

        if (request.result != UnityWebRequest.Result.Success)
        {
            Debug.LogError("Error sending image: " + request.error);
        }
        else
        {
            Debug.Log("Image sent successfully!");
        }
    }
}

