using UnityEngine;
using System.Collections;
using System.IO;
using UnityEngine.Networking;

public class ImageUploader : MonoBehaviour
{
    public string serverURL = "http://your-node-js-server-url/upload";

    public void UploadImage(Texture2D image)
    {
        // Use Texture2D ARGB32 Befor EncodeToPNG
        Texture2D convertedImage = new Texture2D(image.width, image.height, TextureFormat.ARGB32, false);
        convertedImage.SetPixels(image.GetPixels());
        convertedImage.Apply();

        StartCoroutine(UploadImageToServer(convertedImage));
    }

    private IEnumerator UploadImageToServer(Texture2D image)
    {
        byte[] imageData = image.EncodeToPNG();
        WWWForm form = new WWWForm();
        form.AddBinaryData("image", imageData, "screenshot.png", "image/png");
        UnityWebRequest request = UnityWebRequest.Post(serverURL, form);
        yield return request.SendWebRequest();

        if (request.result == UnityWebRequest.Result.Success)
        {
            Debug.Log("Image uploaded successfully");
        }
        else
        {
            Debug.LogError("Error uploading image: " + request.error);
        }
    }
}

