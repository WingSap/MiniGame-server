using UnityEngine;
using System.Collections;
using System.IO;

public class ImageUploader : MonoBehaviour
{
    public string serverURL = "http://your-nodejs-server.com/upload"; // URL �ͧ��������� Node.js

    public void UploadImage(Texture2D image)
    {
        byte[] imageData = image.EncodeToPNG(); // �ŧ�Ҿ�� Binary Data (PNG)

        StartCoroutine(SendImageToServer(imageData));
    }

    private IEnumerator SendImageToServer(byte[] data)
    {
        WWWForm form = new WWWForm();
        form.AddBinaryData("image", data, "screenshot.png", "image/png"); // "image" ��ͪ��͵���÷���ͧ�������ѧ���������

        WWW www = new WWW(serverURL, form);

        yield return www;

        if (www.error != null)
        {
            Debug.LogError("Error uploading image: " + www.error);
        }
        else
        {
            Debug.Log("Image uploaded successfully!");
        }
    }
}

